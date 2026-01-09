import { useState } from 'react';
import { FiSmartphone, FiRadio, FiLogIn, FiLogOut, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function CheckInOut({ status, onCheckIn, onCheckOut, nfcId }) {
    const [enteredId, setEnteredId] = useState('');
    const [error, setError] = useState('');

    const validateAndAction = (action) => {
        if (!enteredId.trim()) {
            setError('Please tap/enter NFC ID');
            return;
        }
        if (enteredId.trim() !== nfcId) {
            setError(<span className="flex items-center gap-1"><FiXCircle /> ID mismatch! Access Denied.</span>);
            return;
        }
        setError('');
        setEnteredId('');
        action();
    };

    const handleCheckIn = () => validateAndAction(onCheckIn);
    const handleCheckOut = () => validateAndAction(onCheckOut);
    return (
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiSmartphone className="text-2xl" /> <span>NFC Access</span>
                </h2>
                <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded">Active</span>
            </div>
            <div className="bg-linear-to-br from-gray-900 to-gray-800 dark:from-zinc-950 dark:to-zinc-900 text-white p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-md border border-gray-700 relative overflow-hidden group">

                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

                <div className="mb-6">
                    <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">NFC Reader</div>
                    <div className="text-[10px] text-gray-500">{nfcId || 'NO TAG'}</div>
                </div>

                <div className="relative mb-8">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center relative z-10 border border-white/10 group-hover:border-white/30 transition-colors">
                        <FiRadio className="text-3xl filter drop-shadow-md" />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500/20 rounded-full animate-ping"></div>
                </div>

                <p className="mb-8 text-gray-300 text-sm leading-relaxed px-4">
                    Place your device near the reader or use the manual controls below.
                </p>

                <div className="w-full">
                    {/* Manual NFC Input */}
                    {(status === 'Not Started' || status === 'Checked In') && (
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter NFC ID (e.g. NFC001)"
                                value={enteredId}
                                onChange={(e) => { setEnteredId(e.target.value); setError(''); }}
                                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-center tracking-widest outline-none focus:border-blue-500 transition-colors"
                            />
                            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                        </div>
                    )}

                    {status === 'Not Started' && (
                        <button
                            onClick={handleCheckIn}
                            className="w-full py-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-900/20 transform active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            <FiLogIn className="text-2xl" /> CHECK IN
                        </button>
                    )}

                    {status === 'Checked In' && (
                        <button
                            onClick={handleCheckOut}
                            className="w-full py-4 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-red-900/20 transform active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse"
                        >
                            <FiLogOut className="text-2xl" /> CHECK OUT
                        </button>
                    )}

                    {status === 'Completed' && (
                        <button
                            disabled
                            className="w-full py-4 bg-gray-600 text-gray-400 rounded-xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-3 border border-gray-500/50"
                        >
                            <FiCheckCircle className="text-2xl" /> SHIFT COMPLETE
                        </button>
                    )}
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-400 dark:text-zinc-500">System Time: {new Date().toLocaleTimeString()}</p>
            </div>
        </div>
    );
}
