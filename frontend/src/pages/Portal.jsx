import { useEffect,useState } from 'react';
import axios from 'axios'
import { Container } from 'react-bootstrap';
import NavBar from '../components/customer/NavBar';
import PendingList from '../components/customer/PendingList'
import ClearedList from '../components/customer/ClearedList'

const bills = [
  {
    month: 'Jun',
    amount: 200
  },
  {
    month: 'Jun',
    amount: 200
  },
  // Add more bills as needed
];

const Portal = () => {
  const [cleared, setCleared] = useState([])
  const [pending, setPending] = useState([])
  const email_address = localStorage.getItem('email')

  useEffect(() => {
    fetchClearedBills();
    fetchPendingBills();
  }, [])

  console.log(cleared)

  const fetchClearedBills = async () => {
    try {
      const response = await axios.get('http://localhost:8000/cleared', {
        email_address
      })
      setCleared(response.data)
    } catch (err) {
      console.log('Error occurred : ' + err)
    }
  }

  const fetchPendingBills = async () => {
    try {
      const response = await axios.get('http://localhost:8000/pending')
      setPending(response.data)
      console.log(pending)
    } catch (err) {
      console.log('Error occurred : ' + err)
    }
  }

  return (
    <>
        <NavBar />
        <Container fluid>
            {/* list of cleared/pending payments */}
            <PendingList bills={bills} />
            <ClearedList bills={bills} />
        </Container>
    </>
  )
}

export default Portal
