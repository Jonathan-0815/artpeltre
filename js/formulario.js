document.addEventListener('DOMContentLoaded', () =>{
    async function handleRegister(e) {
        e.preventDefault();

        const nomUsuario = document.getElementById('nombres').value;
        const apUsuario = document.getElementById('apellidos').value;
        const numContacto= document.getElementById('numero_contacto').value;
        const correoUsuario = document.getElementById('correo').value;
        const contraUsuario = document.getElementById('contraseña').value; 
        const direccionUsuario = document.getElementById('direccion').value; 

        try{
            const res = await fetch('http://localhost:3000/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nomUsuario, apUsuario, numContacto, direccionUsuario, contraUsuario, correoUsuario})
           
            });


            

            const data = await res.json(); 
            if (res.status === 200){
                alert ('Resgistro Exitoso');
            }else {
                alert(`Error: ${data.msg}`);
            }

        }catch(error){
            console.error('Error:', error);
            alert('Error de Registro de Usuario')
        }

       }


    async function handleLogin(e) {
        e.preventDefault();

        const correoUsuario = document.getElementById('correo2').value;
        const contraUsuario = document.getElementById('contraseña').value; 

        try{
            const res = await fetch('http://localhost:3000/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correoUsuario, contraUsuario})
            });


            const data = await res.json();
            if (res.status === 200){
                alert ('Login  Exitoso');
            }else {
                alert(`Error: ${data.msg}`);
            }

        }catch(error){
            console.error('Error:', error);
            alert('Error al inicio de sesión')
        }

       }

       document.getElementById('registerForm').addEventListener('submit',handleRegister);
       document.getElementById('loginForm').addEventListener('submit',handleLogin);
   
});