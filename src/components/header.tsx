export default function Header({ text }: { text: string }) {
  return <p className="text-2xl uppercase font-bold tracking-widest text-shadow-md text-shadow-pink-600/50">{text}</p>
}