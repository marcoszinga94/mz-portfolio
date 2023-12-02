// index.ts

async function enviarCorreo() {
  const nombre = document.getElementById("nombre") as HTMLInputElement;
  const email = document.getElementById("email") as HTMLInputElement;
  const telefono = document.getElementById("telefono") as HTMLInputElement;
  const mensaje = document.getElementById("mensaje") as HTMLTextAreaElement;

  const datos = {
    nombre: nombre.value,
    email: email.value,
    telefono: telefono.value,
    mensaje: mensaje.value,
  };

  // Puedes hacer una solicitud HTTP aquí para enviar los datos al servidor
  // Por ejemplo, usando fetch o axios

  try {
    const response = await fetch("http://localhost:3000/enviar-correo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (response.ok) {
      alert("Correo electrónico enviado con éxito");
    } else {
      alert("Error al enviar el correo electrónico");
    }
  } catch (error) {
    console.error(error);
    alert("Error al enviar el correo electrónico");
  }
}
