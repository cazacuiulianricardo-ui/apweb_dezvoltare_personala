import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../axiosInstance'; 
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManageUsers.css'; 

const ManageUsers = () => {
    const { auth } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/utilizatori/test', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Eroare la obținerea utilizatorilor:', error);
                toast.error(error.response?.data?.message || 'Nu s-au putut încărca utilizatorii.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [auth.token]);

    const handleSoftDelete = async (id) => {
        if (!window.confirm('Ești sigur că dorești să ștergi logic acest utilizator?')) return;

        try {
            await axiosInstance.put(`/utilizatori/soft-delete/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            setUsers(users.map(user => user.idUtilizator === id ? { ...user, isDeleted: true } : user));
            toast.success('Utilizator șters logic cu succes.');
        } catch (error) {
            console.error('Eroare la ștergerea logică:', error);
            toast.error(error.response?.data?.message || 'A apărut o eroare la ștergerea logică.');
        }
    };

    const handleRestore = async (id) => {
        if (!window.confirm('Ești sigur că dorești să reactivezi acest utilizator?')) return;

        try {
            await axiosInstance.put(`/utilizatori/restore/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            setUsers(users.map(user => user.idUtilizator === id ? { ...user, isDeleted: false } : user));
            toast.success('Utilizator reactivat cu succes.');
        } catch (error) {
            console.error('Eroare la reactivarea utilizatorului:', error);
            toast.error(error.response?.data?.message || 'A apărut o eroare la reactivarea utilizatorului.');
        }
    };

    const filteredUsers = users.filter(user => 
        user.nume.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tipUtilizator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Se încarcă utilizatorii...</div>;
    }

    return (
        <div className="manage-users">
            <h1>Gestionare Utilizatori</h1>

            <input
                type="text"
                placeholder="Caută utilizatori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nume</th>
                        <th>Email</th>
                        <th>Tip Utilizator</th>
                        <th>Data Înregistrare</th>
                        <th>Stare</th>
                        <th>Acțiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.idUtilizator} className={user.isDeleted ? 'deleted' : 'active'}>
                                <td>{user.idUtilizator}</td>
                                <td>{user.nume}</td>
                                <td>{user.email}</td>
                                <td>{user.tipUtilizator}</td>
                                <td>{new Date(user.dataInregistrare).toLocaleDateString()}</td>
                                <td>{user.isDeleted ? 'Șters Logic' : 'Activ'}</td>
                                <td>
                                    {!user.isDeleted ? (
                                        <button className="delete-btn" onClick={() => handleSoftDelete(user.idUtilizator)}>
                                            Șterge Logic
                                        </button>
                                    ) : (
                                        <button className="restore-btn" onClick={() => handleRestore(user.idUtilizator)}>
                                            Reactivează
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Nu există utilizatori care să se potrivească criteriilor de căutare.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
