
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Player from './Pages/Player'
import Movies from './Pages/Movies'
import Series from './Pages/Series'
import LikedPrograms from './Pages/LikedPrograms'
function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' element = {<Home />} />
        <Route exact path='/signup' element = {<Signup />} />
        <Route exact path='/login' element = {<Login />} />
        <Route exact path = '/player' element = {<Player />}/>
        <Route exact path = '/movies' element = {<Movies />}/>
        <Route exact path = '/series' element = {<Series />}/>
        <Route exact path = '/mylist' element = {<LikedPrograms />}/>
      </Routes>
    </>
  )
}

export default App
