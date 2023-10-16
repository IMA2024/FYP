from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
from asterisk import manager

app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

# AMI configuration
Ami_Config = {
    'host': '52.172.253.225',
    'port': 5038,
    'username': 'MALIK',
    'secret': '80801'
}

AMI = None  # Initialize AMI connection as None

def Ami_Connect(config):
    global AMI
    if AMI:
        return AMI  # If already connected, return the existing connection

    try:
        AMI = manager.Manager()
        AMI.connect(host=config['host'], port=config['port'])
        AMI.login(username=config['username'], secret=config['secret'])
        return AMI
    except manager.ManagerSocketException as Socket_Error:
        print("Socket Failed" + Socket_Error)
        return None

def Ami_Disconnect(AMI):
    if AMI:
        AMI.logoff()

def Originate_Call(AMI, Source_Channel, Destination_Extension):
    try:
        action = {
            'Action': 'Originate',
            'Channel': Source_Channel,
            'Context': 'Outgoing',
            'Exten': Destination_Extension,
            'Priority': 1,
            'CallerId': 'IMA <080050500>',
            'Timeout': 50000
        }
        response = AMI.send_action(action)
        print(response)
    except Exception as e:
        print("Exception is: " + str(e))

@app.route('/execute_dialer', methods=['POST'])
def execute_dialer():
    data = request.get_json()
    phoneNumber = data.get('phoneNumber')
    extension = data.get('extension')

    if not phoneNumber or not extension:
        return jsonify({'error': 'Phone number and extension are required'}), 400

    Run_Ami = Ami_Connect(Ami_Config)
    if not Run_Ami:
        return jsonify({'error': 'Failed to connect to AMI'}), 500

    Source_Channel = f"PJSIP/{phoneNumber}"
    Destination_Extension = extension  # Use the provided extension

    Originate_Call(Run_Ami, Source_Channel, Destination_Extension)
    # Don't disconnect the connection here; keep it open for future requests

    return jsonify({'message': 'Dialer executed successfully'}), 200

if __name__ == "__main__":
    app.run(debug=True)
