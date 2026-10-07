import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BirthdayWish from './pages/BirthdayWish'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wish" element={<BirthdayWish />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
