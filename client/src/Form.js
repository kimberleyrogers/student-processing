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
                    value={'lim'}
                />
            </label>
            <h2>CPN information</h2>
            <label>
                date of CPN
                <textarea 
                    type="date"
                    required
                    value={'lim'}
                />
            </label>
            <label>
                trainer on CPN 
                <input 
                    type="date"
                    required
                    value={'lim'}
                />
            </label>
            <label>
                CPN comments 
                <input 
                    type="date"
                    required
                    value={'lim'}
                />
            </label>
            <input id='form-submit-button' type="submit" />
        </form>
    )


}

    