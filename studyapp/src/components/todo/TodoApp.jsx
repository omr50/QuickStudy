import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './TodoApp.css'
import LogoutComponent from './LogoutComponent'
// import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import { Navigate } from 'react-router-dom'
import TodoComponent from './TodoComponent'
import FlashcardComponent from './FlashcardComponent'
import Cards from './CardsComponent'
import AddFlashcardset from './addCardsetForm'
import AddFlashcard from './addCardForm'
import SignUpComponent from './SignUpComponent'
import EmailReminder from './ReminderForm'
function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    if (authContext.isAuthenticated)
        return children
    
        return <Navigate to="/login" />
}

function TodoApp() {
    
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<WelcomeComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/signup' element={<SignUpComponent/>}/>
                        <Route path='/welcome/:username' element={
                        <AuthenticatedRoute>
                            <WelcomeComponent/>
                        </AuthenticatedRoute>
                    }/>
                        <Route path='/todos' element={
                        <AuthenticatedRoute>
                            <ListTodosComponent/>
                        </AuthenticatedRoute>
                    }/>
                        <Route path='/flashcards' element={
                        <AuthenticatedRoute>
                            <FlashcardComponent/>
                        </AuthenticatedRoute>
                    }/>
                        <Route path='/todo/:id' element={
                        <AuthenticatedRoute>
                            <TodoComponent/>
                        </AuthenticatedRoute>
                    }/>
                    <Route path='/flashcards/:setname/:id' element={
                        <AuthenticatedRoute>
                            <Cards/>
                        </AuthenticatedRoute>
                    }/>
                    <Route path='/cardset-form/:id' element={
                        <AuthenticatedRoute>
                            <AddFlashcardset/>
                        </AuthenticatedRoute>
                    }/>
                    <Route path='/card-form/:id/:setName/:setId' element={
                        <AuthenticatedRoute>
                            <AddFlashcard/>
                        </AuthenticatedRoute>
                    }/>
                    <Route path='/reminder/:reminder/:id' element={
                        <AuthenticatedRoute>
                            <EmailReminder/>
                        </AuthenticatedRoute>
                    }/>
                    <Route path='/logout' element={
                        <AuthenticatedRoute>
                            <LogoutComponent/>
                        </AuthenticatedRoute>
                    }/>
                        <Route path='/*' element={<ErrorComponent/>}/>
                    </Routes>
                    {/* <FooterComponent/> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}











export default TodoApp


