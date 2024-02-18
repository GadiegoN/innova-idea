import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/routes';
import theme from './src/global/styles'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}