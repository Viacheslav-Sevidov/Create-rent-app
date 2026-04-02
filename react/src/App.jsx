import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-gray-200 flex flex-col min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}