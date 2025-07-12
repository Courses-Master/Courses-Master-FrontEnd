import { Route, Routes } from "react-router-dom"
import SignUp from "./Auth/SignUp"
import SignIn from "./Auth/SignIn"
import AdminHome from "./Pages/Admin/AdminHome"
import RequiredAuth from "./Auth/RequiredAuth"
import NotFoundPage from "./ReuseableComponents/NotFoundPage"
import { useContext } from "react"
import { Auth } from "./Auth/AuthContext"
import { encryptStorage } from "./utils/storage"
import IntroductionPage from "./Pages/IntroductionPage/IntroductionPage"
import StudentHome from "./Pages/Students/StudentHome"
import Courses from "./Pages/Admin/CoursesPages/Courses/Courses"

function App() {
  const { authData } = useContext(Auth)
  const storeAuth = encryptStorage.getItem('auth')
  const storeRole = storeAuth?.data?.role
  return (
    <>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route element={<RequiredAuth />} >
          {storeRole === "student" || authData?.data?.role === "student" ? (
            <Route path="/student-home" element={<StudentHome />} />
          ) : storeRole === "admin" || authData?.data?.role === "admin" ? (
            <>
              <Route path="/Admin-home" element={<AdminHome />} />
              <Route path="/Admin-Courses" element={<Courses />} />
            </>
          ) : null
          }
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
