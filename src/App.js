import { useState, useEffect } from 'react'
import { Create } from './components/create'
import { Listuser } from './components/list'
import axios from './lib/axios'

const App = () =>  {
  const [ users, setUsers ] = useState([])
  const [ activeUsers, setActiveUsers ] = useState(null)

  useEffect(async() => {
    const data = await axios.get('userget')

    if(data) setUsers(data)
  }, [null])

  const Active = (data) => {
    setActiveUsers(data)
  }
  console.log(users)
  return (
    <div className="max-w-screen-lg mx-auto p-3 mt-12 md:mt-32">
        <Create setUsers={setUsers} activeUsers={activeUsers}/>
        <br />
        {
          users.length === 0 ? null :
          <Listuser users={users} active={(e) => Active(e)}/>
        }
        
    </div>
  );
}

export default App;
