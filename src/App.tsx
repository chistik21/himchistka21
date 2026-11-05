import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import { useThemeScheme } from './hooks/useThemeScheme'

export default function App() {
  useThemeScheme()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
