import {useState} from 'react'
import './App.css';
import './index.css'
import Post from './Post';

function App() {

  const [images , setImages] = useState('')
  return (
    <div className=' bg-slate-200'>
      <Post/>
    </div>
  );
}

export default App;
