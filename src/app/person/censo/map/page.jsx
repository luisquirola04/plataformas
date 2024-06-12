'use client';
import Menu from '../../../components/menu/menu';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function CrearCenso() {
    
    return (
        <div>
            <Menu />
            <main className="Container text-center mt-5">
                <div className="mt-5">
                    <h2>Ubicación del Censo</h2>
                    <MapContainer center={[-4.0444,-79.7788]} zoom={13} style={{ height: "800px", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[-4.0444,-79.7788]}>
                            <Popup>
                                Ubicación del censo.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </main>
        </div>
    );
}