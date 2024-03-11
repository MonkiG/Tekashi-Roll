import Image from 'next/image'

export default function Footer ({ className }: { className?: string }): JSX.Element {
  return (
      <footer className={`flex items-center justify-around px-16 py-5 ${className}`}>
          <Image src="/brand-logo.jpeg" alt="tekashi roll logo" className="w-1/12 rounded-full" width={51} height={51} />
          <section className="w-1/4 ">
              <h3 className="text-center font-bold">Tekashi Roll</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad eum inventore eius nesciunt dolorem! Nobis obcaecati quidem recusandae corporis at? Illum numquam cumque architecto, nisi libero amet. Culpa, eveniet doloremque.</p>
          </section>
          <section className="w-1/4">
              <h3 className="text-center font-bold">Servicios</h3>
              <ul>
                  <li>Reserva</li>
                  <li>Por pedido</li>
                  <li>Domicilio</li>
                  <li>322-123-45-67</li>
              </ul>
          </section>
          <section className="w-1/4">

              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.333290944907!2d-105.27530772505344!3d20.737281080840116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842147021a2f3155%3A0x8d86943c57bac868!2sAv.%20Altavela%2048%2C%20Fraccionamiento%20Altavela%2C%2063735%20Nay.!5e0!3m2!1ses!2smx!4v1697157688359!5m2!1ses!2smx" width="400" height="150" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </section>
      </footer>
  )
}
