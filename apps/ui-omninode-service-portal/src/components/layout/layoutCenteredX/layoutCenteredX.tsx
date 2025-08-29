export default function LayoutCenteredX({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-6 flex justify-center">
            {children}
        </div>
    )
}