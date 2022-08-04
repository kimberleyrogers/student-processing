import { useEffect, useState } from 'react';
import './form.css';

// Form for user to complete

export function Form() {

    // state for form fields
    const [wdType, setWdType] = useState('');
    const [wdDate, setWdDate] = useState('')
    const [wdReason, setWdReason] = useState('')
    const [pstacd, setpstacd] = useState('');
    const [cpnDate, setCpnDate] = useState('')
    const [cpnTrainer, setCpnTrainer] = useState('')
    const [cpnComments, setCpnComments] = useState('');
   

    return (
        <form >
            <h2>withdrawal information</h2>
            <label>
                type of withdrawal
                <select>
                    <option value='formal'>formal</option>
                    <option value='apparent'>apparent</option>
                </select>
            </label>
            <label>
                date of withdrawal
                <input 
                    type="date"
                    required
                    value={wdDate}
                />
            </label>
            <label>
                reason for withdrawal
                <input 
                    type="text"
                    required
                    value={wdReason}
                />
            </label>
            <label>
                PSTACD
                <input 
                    type="date"
                    required
                    value={pstacd}
                />
            </label>
            <h2>CPN information</h2>
            <label>
                date
                <input 
                    type="date"
                    required
                    value={cpnDate}
                />
            </label>
            <label>
                trainer
                <input 
                    type="text"
                    required
                    value={cpnTrainer}
                />
            </label>
            <label>
                comments 
                <textarea 
                    type="text"
                    required
                    value={cpnComments}
                />
            </label>
            <input id='form-submit-button' type="submit" />
        </form>
    )


}

    