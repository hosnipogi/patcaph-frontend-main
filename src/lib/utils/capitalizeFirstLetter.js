export default function capitalizeFLetter(word) {
  return (
    typeof window === "object" && `${word[0].toUpperCase()}${word.slice(1)}`
  )
}
