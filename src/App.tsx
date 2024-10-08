import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import SchemaEditor from './pages/SchemaEditor';
import Home from './pages/Home.page';

function App() {


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            N8 Custom Fields
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/schemaEditor">
            Schema Editor
          </Button>
          {/* <Button color="inherit" component={Link} to="/output">
          Output Form
        </Button> */}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schemaEditor" element={<SchemaEditor />} />
          {/* <Route path="/output" element={<OutputForm />} /> */}
        </Routes>
      </Container>
    </>
  )
}

export default App
