export default function UserId ({ params }: { params: { id: string } }): JSX.Element {
  return (
        <h2>User Id: {params.id}</h2>
  )
}
