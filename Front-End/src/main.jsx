import { createRoot } from 'react-dom/client'
import {PrimeReactProvider} from "@primereact/core"
import './styles/index.css'
import Aura from "@primeuix/themes/aura"
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
    <PrimeReactProvider theme={{preset: Aura}} license={import.meta.env.VITE_PRIME_LICENSE_KEY} >
    <App />
    </PrimeReactProvider>
)
