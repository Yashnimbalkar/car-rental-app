import { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8">
        <h2 className="mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field name="email" type="email" className="form-control w-100 mx-auto" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
