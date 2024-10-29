"use client"
import Link from "next/link";
import axios from "axios";

export default function EstatusVenta({ id }) {
    async function cancelar(event) {
        event.preventDefault(); // Prevenir la recarga de página al hacer clic en el enlace

        try {
            // Llamada a la API para cancelar la venta
            const url = `http://localhost:3000/actualizarEstatusVenta/${id}`;
            const response = await axios.patch(url);

            if (response.data.success) {
                alert("Venta cancelada exitosamente.");
            } else {
                alert(response.data.message || "No se pudo cancelar la venta.");
            }
        } catch (error) {
            console.error("Error al cancelar la venta:", error);
            alert("Ocurrió un error al cancelar la venta.");
        }

        window.location.replace("/ventas/mostrar");
    }

    return (
        <Link href="#" onClick={cancelar}>
    <button className="btn btn-outline-danger btn-sm">
        <i className="bi bi-x-circle"></i> Cancelar Venta
    </button>
</Link>
    );
}