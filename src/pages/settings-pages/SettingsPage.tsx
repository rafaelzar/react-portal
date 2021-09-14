import React from 'react';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserSelector } from '../../store/selectors/selectors';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Spinner,
  Modal,
} from 'react-bootstrap';
import { swalError, swalInfo, swalSuccess } from '../../lib/utils/toasts';
import {
  changePasswordAuthAction,
  fetchUserFromDatabaseAuthAction,
  logOutCognitoUserAuthAction,
  updateUserAuthAction,
} from '../../store/actions/authActions';
import { validateChangePasswordSubmit } from '../../lib/utils/validator';
import UserInfoCard from '../../components/UserInfoCard';
import { fetchIdTokenCognitoFunction } from '../../lib/aws/aws-cognito-functions';
import PaymentSettings from '../../components/settings-page/PaymentSettings';
import {
  getEmployeeBankDetailsPaymentAction,
  getEmployeeEarningsPaymentAction,
} from '../../store/actions/paymentActions';
import {
  IEmployeeEarningsDetails,
  IBankAccount,
  IAccounts,
  IUserInformation,
} from '../../lib/interfaces';
import EarningDetails from '../../components/settings-page/EarningDetails';
import { deletePlaidAccountPlaidAction } from '../../store/actions/plaidActions';

const SettingsPage: React.FC = () => {
  const userInfo = useSelector((state) => getUserSelector(state));
  const {
    plaid_account: plaidAccount = '',
    first_name: userFirstName = '',
    last_name: userLastName = '',
    nick_names: userNickName = [''],
    phone: userPhone = '',
    _id: userId = '',
  } = userInfo;
  // user with earning details
  // const userId = '60ad43e35e08070013432c0b';
  const [firstName, setFirstName] = React.useState(userFirstName.trim());
  const [lastName, setLastName] = React.useState(userLastName);
  const [phoneNumber, setPhoneNumber] = React.useState(userPhone);
  const [nickNames, setNickNames] = React.useState(userNickName);
  const [tempNickname, setTempNickname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
  const [disable, setDisable] = React.useState(false);
  const [actveSection, setActveSection] = React.useState('general');
  const [earningsData, setEarningsData] = React.useState<
    IEmployeeEarningsDetails
  >({} as IEmployeeEarningsDetails);
  const [bankAccountDetails, setBankAccountDetails] = React.useState<
    IAccounts[]
  >([]);
  const [bankName, setBankName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleteBankLoading, setIsDeleteBankLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  React.useEffect(() => {
    async function fetchIdToken() {
      const idToken = await fetchIdTokenCognitoFunction();
      if (idToken === false) {
        history.push('/login');
      }
    }
    fetchIdToken();
    if (window.location.href.indexOf('#payment') > -1) {
      setActveSection('payment');
      window.history.replaceState(null, 'null', window.location.pathname);
    }
    setIsLoading(true);
    if (userId) {
      dispatch(getEmployeeEarningsPaymentAction(userId)).then(
        (res: IEmployeeEarningsDetails) => {
          if (res) {
            setEarningsData(res);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        },
      );
      if (plaidAccount !== '') {
        dispatch(getEmployeeBankDetailsPaymentAction(userId)).then(
          (res: IBankAccount) => {
            if (res) {
              const { accounts, bank } = res;
              setBankAccountDetails(accounts);
              setBankName(bank);
            }
          },
        );
      }
    }
  }, [dispatch, userId, plaidAccount, history]);

  const updateSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const isUserInfoChanged = userFirstName.trim() !== firstName.trim()
      || lastName.trim() !== userLastName.trim()
      || userNickName.length !== nickNames.length
      || userPhone.trim() !== phoneNumber.trim();

    const isPasswordChanged = password !== '' || newPassword !== '' || confirmNewPassword !== '';
    if (isUserInfoChanged === true) {
      await updateUserInfo();
      setDisable(true);
    }
    if (isPasswordChanged) {
      if (
        validateChangePasswordSubmit(
          isUserInfoChanged,
          password.trim(),
          newPassword.trim(),
          confirmNewPassword.trim(),
        )
      ) {
        await changePassword();
        setDisable(true);
      }
    }
    if (isPasswordChanged === false && isUserInfoChanged === false) {
      swalInfo('No changes were made');
    }
  };

  const changePassword = async () => {
    dispatch(changePasswordAuthAction(password, newPassword)).then(
      (res: boolean | string | undefined) => {
        setDisable(true);
        if (res) {
          dispatch(logOutCognitoUserAuthAction()).then(
            (logoutRes: boolean | string | undefined) => {
              if (logoutRes) {
                swalInfo('Login with new password');
                history.push('/login');
              }
            },
          );
          setDisable(false);
        }
      },
    );
  };

  const updateUserInfo = async () => {
    setDisable(false);
    dispatch(
      updateUserAuthAction(userId, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phoneNumber.trim(),
        nick_names: nickNames,
      }),
    ).then((res: boolean | string | undefined) => {
      setDisable(true);
      if (res) {
        swalSuccess('You updated info successfuly');
      } else {
        swalError('Something went wrong');
      }
      setDisable(false);
    });
  };

  const updateNickname = () => {
    const doesNicknameExits = nickNames.some(
      (item: string) => tempNickname === item,
    );
    if (doesNicknameExits === false) {
      setNickNames([...nickNames, tempNickname.trim()]);
      setTempNickname('');
    } else {
      swalInfo('That nickname already exist');
    }
  };

  const deleteNickname = (value: string) => {
    const newNicknames = nickNames.filter((element) => element !== value);
    setNickNames(newNicknames);
  };

  const deleteBankAccount = () => {
    if (plaidAccount !== '') {
      setIsDeleteBankLoading(true);
      dispatch(deletePlaidAccountPlaidAction(userId)).then(
        (res: IUserInformation) => {
          if (res) {
            dispatch(fetchUserFromDatabaseAuthAction()).then(
              (response: boolean | undefined) => {
                if (response) {
                  swalSuccess('Bank account deleted');
                  setShowModal(false);
                  setIsDeleteBankLoading(false);
                }
              },
            );
          } else {
            setIsDeleteBankLoading(false);
          }
        },
      );
    }
  };

  return (
    <DefaultLayout>
      <div className='settings-nav'>
        <div className='settings-nav-links'>
          <span
            className={`settings-nav-link ${
              actveSection === 'general' ? 'active' : ''
            }`}
            onClick={() => setActveSection('general')}
          >
            GENERAL SETTINGS
          </span>
          <span
            className={`settings-nav-link ${
              actveSection === 'payment' ? 'active' : ''
            }`}
            onClick={() => setActveSection('payment')}
          >
            PAYMENT SETTINGS
          </span>
        </div>
      </div>
      <div className='user-settings-wrapper mb-5'>
        <Container fluid>
          <div>
            <h1 className='mt-5'>Account Settings</h1>
          </div>
          <Row>
            <Col lg='4' className='mt-3'>
              <UserInfoCard />
            </Col>
            {actveSection === 'general' ? (
              <Col lg='8' className='mt-3'>
                <Card>
                  <Container className='my-3'>
                    <h2 className='big-h2'>General Settings</h2>
                    <div className='horizontal-line my-3' />
                    <h3>Contact Information</h3>
                    <Form>
                      <Row>
                        <Col lg='6' md='12'>
                          <Form.Group className='mb-3'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type='text'
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='6' md='12'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type='text'
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg='6' md='12'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Add Nickname</Form.Label>
                            <InputGroup className='mb-3'>
                              <Form.Control
                                aria-label='Nick names'
                                aria-describedby='basic-addon2'
                                value={tempNickname}
                                onChange={(e) => setTempNickname(e.target.value)}
                              />
                              <InputGroup.Append>
                                <Button
                                  variant='outline-secondary'
                                  onClick={() => {
                                    updateNickname();
                                  }}
                                >
                                  Add
                                </Button>
                              </InputGroup.Append>
                            </InputGroup>
                            <Col lg='12' md='12'>
                              <Row>
                                {nickNames.length !== 0 && (
                                  <span className='font-weight-bold mr-1'>
                                    Nicknames:
                                  </span>
                                )}
                                {nickNames && nickNames.length !== 0 ? (
                                  nickNames.map((n: string, i) => {
                                    return (
                                      <div
                                        className='pointer'
                                        onClick={() => deleteNickname(n)}
                                        key={n}
                                      >
                                        {(i ? ', ' : '') + n}
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div>You don&apos;t have nicknames.</div>
                                )}
                              </Row>
                              <Row>
                                {nickNames.length !== 0 && (
                                  <div className='text-info'>
                                    Click on the nickname to remove it
                                  </div>
                                )}
                              </Row>
                            </Col>
                          </Form.Group>
                        </Col>
                        <Col lg='6' md='12'>
                          <Form.Group className='mb-4'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type='text'
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='12'>
                          <div className='horizontal-line mb-3' />
                        </Col>
                        <Col lg='6'>
                          <h3>Password</h3>
                          <Form.Group className='my-3'>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                              type='password'
                              placeholder='**********'
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='6' />
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                              type='password'
                              placeholder='**********'
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='6' />
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type='password'
                              placeholder='**********'
                              onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='12'>
                          <div className='horizontal-line mt-3 mb-4' />
                        </Col>
                        <Col lg='12'>
                          <Button
                            className='btn ml-auto'
                            onClick={updateSubmit}
                            disabled={disable}
                          >
                            Save changes
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Container>
                </Card>
              </Col>
            ) : (
              <Col lg='8' className='mt-3'>
                {!isLoading ? (
                  <>
                    <EarningDetails data={earningsData} />
                    <Card>
                      <Container className='my-3'>
                        {!plaidAccount ? (
                          <PaymentSettings />
                        ) : (
                          <div>
                            <h2 className='big-h2'>Payment Methods</h2>
                            <p>Bank Account is connected</p>
                            <div className='mb-3'>
                              <h4>Bank:</h4>
                              {bankName || ''}
                            </div>
                            <h4>Card details:</h4>
                            <div className='font-weight-bold my-2'>
                              **** **** ****
                              {' '}
                              {bankAccountDetails[0]?.mask}
                            </div>
                            <div>{bankAccountDetails[0]?.official_name}</div>
                            <Button
                              className='my-3'
                              onClick={() => setShowModal(true)}
                            >
                              Disconnect Bank Account
                            </Button>
                          </div>
                        )}
                        <Modal
                          show={showModal}
                          onHide={() => setShowModal(false)}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Delete Bank Account</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p>Are you sure you want to delete bank account?</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              disabled={isDeleteBankLoading}
                              onClick={deleteBankAccount}
                            >
                              {isDeleteBankLoading ? (
                                <Spinner animation='border' />
                              ) : (
                                'Yes'
                              )}
                            </Button>
                            <Button onClick={() => setShowModal(false)}>
                              No
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Container>
                    </Card>
                  </>
                ) : (
                  <Spinner className='d-block m-auto' animation='border' />
                )}
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default SettingsPage;
