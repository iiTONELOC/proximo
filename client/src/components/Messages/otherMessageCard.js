/* This example requires Tailwind CSS v2.0+ */

export default function OtherUsersCard({ message }) {
    // CURRENT USER MESSAGE CARD
    return (
        <>
            <div className="flex justify-start mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div
                    className="ml-2 py-3 px-4 bg-yellow-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-gray-500 shadow-inner">
                    {message.value}
                </div>
            </div>
            <div className="mr-l flex flex-row justify-start flex-wrap">
                <span id='sent'
                    className="w-15 px-5 py-1 h-8 flex flex-wrap justify-start text-sm text-start font-medium   text-gray-400 rounded-full">
                    {new Date(message.time).toLocaleTimeString()}
                </span>
            </div>`
        </>
    )
}

