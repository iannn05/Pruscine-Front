export interface IUser {
    idusuario: number;
    nombre: string;
    email: string;
    contrasenia: string;
    fechaNacimiento: Date;
}

function newUser(
    idusuario: number,
    nombre: string,
    email: string,
    contrasenia: string,
    fechaNacimiento: Date
): IUser {
    return {
        idusuario: (idusuario ?? 0),
        nombre: (nombre ?? ''),
        email: (email ?? ''),
        contrasenia: (contrasenia ?? ''),
        fechaNacimiento: (fechaNacimiento ?? '')
    };
}


export default {
    newUser
} as const;