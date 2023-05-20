import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment/moment"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { postCardApi, postCardSetApi, retrieveCardByIdApi, retrieveCardSetByIdApi, retrieveCardsForSetApi, updateCardApi, updateCardSetApi } from "./api/FlashcardApiService"
import * as Yup from 'yup';
import { setTodoReminderApi } from "./api/TodoApiService"

export default function EmailReminder() {
    const authContext = useAuth()
    const {reminder, id} = useParams()
    const navigate = useNavigate()
    const username = authContext.username
    const [email, setEmail] = useState('')
    function onSubmit(values) {
        // add the reminder email 
        const reminderEmail = values.email
        setTodoReminderApi(username, id, reminder, reminderEmail)
        .then(response => {
          console.log(response)
          navigate("/todos")
      })
      .catch(error => {console.log(error); navigate("/todos")})
    }

    
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
    });
    function validate(values) {
      let errors = {
          // description: 'Enter a valid description',
          // targetDate: 'Enter a valid target date'
      }
      if (!values.email) {
        errors.email = 'Required'
      } 
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      console.log(values)
      return errors
  }
    
      return (
        <div className="container">
        <h1>Enter Card Details</h1>
        <div>
        <Formik initialValues={{email}}
        enableReinitialize={true}
        onSubmit = {onSubmit}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        >
            {
                (props) =>(
                    <Form>
                        <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                        />
                        <fieldset className="form-group">
                            <label>Email</label>
                            <Field type="text" className="form-control" name="email"/>
                        </fieldset>
                        <div>
                            <Button type="submit" className="m-5 p-2">Save</Button>
                        </div>
                    </Form>
                )
            }
            </Formik>
            </div>
        </div>
       
        );
    };
    