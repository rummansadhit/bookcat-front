import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose, title }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');


  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    
  });
   


  const dispatch = useDispatch();
  const firebase = useFirebase();
  const navigate = useNavigate();



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credentials, profile);
    firebase
      .createUser(credentials, profile).then((user) =>
       {
        toast.success('User Created Successfully.');
      })
      .catch((error) => {
        console.log(error);
      }
      
      );

      onClose();
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };



  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    //setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  




const handleLogin = (e: FormEvent<HTMLFormElement>) => {

  e.preventDefault();


  firebase
    .login(credentials)
    .then((userCredential: any) => {
      // Login successful, dispatch login success action
      navigate('/');
    })
    .catch((error: any) => {
      // Login unsuccessful, dispatch login error action
      console.error('Login error:', error);
    });

    onClose();
};









  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };


  const renderLoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name='email'
              onChange={handleChangeLogin}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
                name='password'
              onChange={handleChangeLogin}
            />
          </FormControl>

          <button
          className="daisy-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Login
        </button>


        </Stack>
      </form>
    );
  };

  const renderRegisterForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>


        <FormControl id="name">
            <FormLabel>FullName</FormLabel>
            <Input
              type="text"
              name="username"
              onChange={handleChange}
            />
          </FormControl>


          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
                name="email"
                onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
               name="password"
               onChange={handleChange}
            />
          </FormControl>



          <button
          className="daisy-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>


        </Stack>
      </form>
    );
  };

  const modalHeader = activeTabIndex === 0 ? 'Log In' : 'Register';
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs align="center" onChange={handleTabChange} index={activeTabIndex} defaultIndex={0} >
            <TabList>
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>{renderLoginForm()}</TabPanel>
              <TabPanel>{renderRegisterForm()}</TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginForm;
