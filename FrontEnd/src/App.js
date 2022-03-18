import ListSection from './components/List/ListSection'
import { ThemeProvider } from '@mui/material/styles'
import Theme from './theme/pallet'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <ListSection />
    </ThemeProvider>
  )
}

export default App
