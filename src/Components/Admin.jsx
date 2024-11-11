import  { useEffect, useState } from 'react';
import { db } from '../Config/firebase'; // Import Firebase config
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const AdminSwapRequests = () => {
  const [swapRequests, setSwapRequests] = useState([]);

  // Fetch swap requests from Firestore
  useEffect(() => {
    const fetchSwapRequests = async () => {
      const q = query(collection(db, 'userswap'));
      const querySnapshot = await getDocs(q);
      const requests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSwapRequests(requests);
    };

    fetchSwapRequests();
  }, []);

  // Approve a swap request
  const handleApprove = async (id) => {
    try {
      const swapRef = doc(db, 'userswap', id);
      await updateDoc(swapRef, { status: 'approved' });
      alert('Swap request approved.');
      setSwapRequests(swapRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error approving swap request:', error);
    }
  };

  // Reject a swap request
  const handleReject = async (id) => {
    try {
      const swapRef = doc(db, 'userswap', id);
      await updateDoc(swapRef, { status: 'rejected' });
      alert('Swap request rejected.');
      setSwapRequests(swapRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error rejecting swap request:', error);
    }
  };

  return (
    <div className="p-6 pt-24 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Admin - Phone Swap Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">User Name</th>
              <th className="py-2 px-4 border-b text-left">Phone Model</th>
              <th className="py-2 px-4 border-b text-left">Phone Number</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">ImgUrl</th>
              <th className="py-2 px-4 border-b text-enter">Action</th>
            </tr>
          </thead>
          <tbody>
            {swapRequests.map((request) => (
              <tr key={request.id}>
                <td className="py-2 px-4 border-b">
                  {/* Fetch and display Phone 1 details */}
                  <div> {request.name}</div>
                  {/* Additional phone details can be fetched and displayed here */}
                </td>
                <td className="py-2 px-4 border-b">
                  {/* Fetch and display Phone 2 details */}
                  <div>{request.phoneModel}</div>
                  {/* Additional phone details can be fetched and displayed here */}
                </td>
                <td className="py-2 px-4 border-b">
                  <div> {request.number}</div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div>{request.description}</div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div>{request.description}</div>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {swapRequests.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No pending swap requests.</p>
      )}
    </div>
  );
};

export default AdminSwapRequests;
