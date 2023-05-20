import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment/moment"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { postCardApi, postCardSetApi, retrieveCardByIdApi, retrieveCardSetByIdApi, retrieveCardsForSetApi, updateCardApi, updateCardSetApi } from "./api/FlashcardApiService"

export default function AddFlashcard() {
    const {id, setName, setId} = useParams()
    const [word, setWord] = useState('')
    const [definition, setDefinition] = useState('')
    const authContext = useAuth()
    const navigate = useNavigate()
    const username = authContext.username

    useEffect(
        ()=> retrieveFlashcard(),
        [id]
    )
    function retrieveFlashcard() {
        if (id != -1){
            retrieveCardByIdApi(username, id)
                .then(response => {
                    setWord(response.data.word)
                    setDefinition(response.data.definition)
                    console.log('card retrieved', response.data)
                })
                .catch(error => console.log(error))
            }
        
    }

    function onSubmit(values) {
        console.log(values)
        const card = {
            id: id,
            word: values.word,
            definition: values.definition,
            cardsetId: setId
        }
        if (id != -1){
            updateCardApi(username, card, id)
                .then(response => {
                    console.log("Updated a new card")
                    console.log(card)
                    navigate(`/flashcards/${setName}/${setId}`)

                })
                .catch(error => console.log(card, error))
            }
        else{
            postCardApi(username, card)
                .then(response => {
                    console.log("posted new card")
                    navigate(`/flashcards/${setName}/${setId}`)
                })
                .catch(error => console.log(error))
            }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }
        if (values.word.length < 1){
            errors.word = 'Enter at least 1 characters'
        }
        if (values.definition.length < 1) {
            errors.definition = 'enter at least 1 characters'
        }
        if (values.definition.length > 125){
            errors.definition = 'Cannot exceed 125 characters.'
        }
        console.log(values)
        return errors
    }
    return (
        <div className="container">
            <h1>Enter Card Details</h1>
            <div>
            <Formik initialValues={{word, definition}}
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
                            name="word"
                            component="div"
                            className="alert alert-danger"
                            />
                            <ErrorMessage
                            name="definition"
                            component="div"
                            className="alert alert-danger"
                            />
                            <fieldset className="form-group">
                                <label>Word</label>
                                <Field type="text" className="form-control" name="word"/>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Definition</label>
                                <Field type="text" className="form-control" name="definition"/>
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