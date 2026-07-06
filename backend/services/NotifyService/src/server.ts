import app from './app';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { sendOtpEmailService } from './services/email.service';

const port = process.env.PORT || 3002;




// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





// --- gRPC Server Setup ---
const PROTO_PATH = path.join(
  process.cwd(),
  '../../proto/notify.proto'
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;   

const grpcServer = new grpc.Server();


const SendOTP = async(call: any, callback: any) => {
    const { email, otp } = call.request;

    // console.log(`[gRPC]: Received request to send OTP ${otp} to email ${email}.`);
 const result = await sendOtpEmailService({ email, otp });

  
  if (result.success) {
    callback(null, { success: true, message: 'OTP sent successfully' });
  } else {
    callback({
      code: grpc.status.INTERNAL,
      details: result.message
    });
  }
}




// Start the gRPC server on a standard gRPC port
grpcServer.addService(
  (notificationProto as any).NotificationService.service,
  { SendOTP }
);

grpcServer.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`gRPC running on ${port}`);
  }
);