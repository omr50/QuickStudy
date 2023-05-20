import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment/moment"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { postCardSetApi, retrieveCardSetByIdApi, retrieveCardsForSetApi, updateCardSetApi } from "./api/FlashcardApiService"

export default function AddFlashcardset() {
    const {id} = useParams()
    const [setName, setSetName] = useState('')
    const [setDescription, setSetDescription] = useState('')
    const authContext = useAuth()
    const navigate = useNavigate()
    const username = authContext.username

    useEffect(
        ()=> retrieveFlashcards(),
        [id]
    )
    function retrieveFlashcards() {
        if (id != -1){
            retrieveCardSetByIdApi(username, id)
                .then(response => {
                    setSetName(response.data.setName)
                    setSetDescription(response.data.setDescription)
                    console.log('card retrieved', response.data)
                })
                .catch(error => console.log(error))
            }
    }

    function onSubmit(values) {
        console.log(values)
        const cardset = {
            id: id,
            username: username,
            setName: values.setName,
            setDescription: values.setDescription,
        }
        if (id != -1){
            updateCardSetApi(username, id, cardset)
                .then(response => {
                    console.log("Updated a new card")
                    console.log(cardset)
                    navigate("/flashcards")
                })
                .catch(error => console.log(error))
            }
        else{
            postCardSetApi(username, cardset)
                .then(response => {
                    console.log("posted new card")
                    navigate("/flashcards")
                })
                .catch(error => console.log(error))
            }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }
        if (values.setName.length < 5){
            errors.setName = 'Enter at least 5 characters'
        }
        if (values.setDescription < 5) {
            errors.setDescription = 'enter at least 5 characters'
        }
        console.log(values)
        return errors
    }
    return (
        <div className="container">
            <h1>Enter Card Set Details</h1>
            <div>
            <Formik initialValues={{setName, setDescription}}
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
                            name="setName"
                            component="div"
                            className="alert alert-danger"
                            />
                            <ErrorMessage
                            name="setDescription"
                            component="div"
                            className="alert alert-danger"
                            />
                            <fieldset className="form-group">
                                <label>Set Name</label>
                                <Field type="text" className="form-control" name="setName"/>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="setDescription"/>
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
    )
}