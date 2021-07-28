import { ExclamationIcon } from '@heroicons/react/solid'

export default function createError() {
    return (
        <div className="rounded-md bg-red-500 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-white">Server Error!!</h3>
                    <div className="mt-2 text-sm text-white">
                        <p>
                            Sorry, we already have a user with that email address!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}