import Home from './components/Home';



function App() {
  
  return (
    <div className="bg-cover-20"
    style={{ 
      backgroundImage: "url('/weather-background.jpg')",
      height: '100vh', // Set to full viewport height
        backgroundAttachment: 'fixed', // Make the background fixed
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      
    }}>
      <Home/>
    </div>
  );
}

export default App;
