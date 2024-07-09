'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const EmailVerification = ({ params }: { params: { token: string } }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`/api/user/reg?token=${params.token}`);
                const result = await response.json();
                if (result?.user?.isVerified) {
                    setIsVerified(true);
                } else {
                    setError('Email verification failed. Please try again.');
                }
            } catch (err) {
                console.error('Verification Email Error', err);
                setError('An error occurred during verification. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        verifyEmail();
    }, [params.token]);

    if (loading)
        return <div className="text-lg text-gray-700">Verifying your email...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
            {isVerified ? (
                <div className="bg-white p-10 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-green-600">Email Verified Successfully!</h1>
                    <p className="mt-4 text-gray-700">Your email has been verified. You can now log in to your account.</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Go to Login
                    </button>
                </div>
            ) : (
                <div className="bg-white p-10 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-red-600">Email Verification Failed</h1>
                    <p className="mt-4 text-gray-700">{error}</p>
                </div>
            )}
        </div>
    );
}

export default EmailVerification;
