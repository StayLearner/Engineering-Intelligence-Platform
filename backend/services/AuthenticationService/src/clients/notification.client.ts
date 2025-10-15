import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Path to the shared blueprint file
const PROTO_PATH = path.join(__dirname, '../../../../proto/notify.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification as any;

// Create the client (the remote control)
const notificationClient = new notificationProto.NotificationService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Export a clean function for our service to use
export const sendOtpViaRpc = (email: string, otp: string) => {
  // console.log('[gRPC Client]: Auth-service calling notify-service...');

  notificationClient.SendOTP({ email, otp }, (error: any, response: any) => {
    if (error) {
      console.error('[gRPC Client] Error:', error.details || error.message);
      return;
    }
    // console.log('[gRPC Client] Response:', response.message);
  });
};