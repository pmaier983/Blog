interface IncrementingButtonProps {
  children: React.ReactNode
  clickCount: number | null
  onClick: () => void
  className?: string
}

export const IncrementingButton = ({
  children,
  clickCount,
  onClick,
  className,
}: IncrementingButtonProps) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        className="flex flex-row gap-1 bg-transparent hover:text-gray-800 text-gray-500 font-semibold py-2 px-4 border-2 border-grey-500 hover:border-grey-700 rounded"
        onClick={onClick}
      >
        {children}
      </button>
      Clicked {typeof clickCount === "number" ? clickCount : `X`} times
    </div>
  )
}
