import React, { useState } from 'react';
import axios from 'axios';

interface Log {
  message: string;
}

const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<Log[]>([]);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const sendLog = async () => {
    try {
      await axios.post('http://localhost:3001/send-log', { message });
      alert('Log enviado com sucesso');
      setMessage(''); // Limpar o campo de entrada
    } catch (error) {
      console.log(error);
      alert('Erro ao enviar log');
    }
  };

  const getLogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get-logs');
      setLogs(response.data);
    } catch (error) {
      console.log(error);
      alert('Erro ao recuperar logs');
    }
  };

  const sendEmail = async () => {
    try {
      await axios.post('http://localhost:3001/send-email', {
        toAddress: emailTo,
        subject: emailSubject,
        body: emailBody
      });
      alert('E-mail enviado com sucesso');
      setEmailTo('');
      setEmailSubject('');
      setEmailBody('');
    } catch (error) {
      console.log(error);
      alert('Erro ao enviar e-mail');
    }
  };

  return (
    <div>
      <h1>Notificador de Logs e E-mails</h1>
      
      <div>
        <h2>Enviar Log</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendLog}>Enviar Log</button>
      </div>

      <div>
        <h2>Mostrar Logs</h2>
        <button onClick={getLogs}>Mostrar Logs</button>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log.message}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2>Enviar E-mail</h2>
        <input
          type="email"
          placeholder="Para"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assunto"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
        />
        <textarea
          placeholder="Corpo do e-mail"
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
        />
        <button onClick={sendEmail}>Enviar E-mail</button>
      </div>
    </div>
  );
};

export default App;
