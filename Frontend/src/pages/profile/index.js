import React, { useEffect, useState } from 'react';
import "./styles.css";
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export const Profile = () => {
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ong_id = localStorage.getItem('ong_id');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ong_id
            }
        })
            .then(response => {
                setIncidents(response.data)
            })
    }, [ong_id]);

    const handleDeleteIncident = async (id) => {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ong_id
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id))

        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt='Be The Hero' />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={() => handleLogout()}>
                    <FiPower size={18} color="rgb(224, 32, 65)" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>

                        <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                            <FiTrash2 size={20} color="rgb(168, 168, 179)" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    )
}