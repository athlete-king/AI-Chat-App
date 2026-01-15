"use client"

const TypingIndicator = () => {
    return (
        <div
            className={"rounded-lg p-3 max-w-xs md:max-w-sm lg:max-w-md bg-gray-200 text-gray-800 rounded-bl-none"}
        >
            <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-300"></span>
            </div>
        </div>
    )
}

export { TypingIndicator }
