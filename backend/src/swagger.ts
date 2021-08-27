import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const createSwagger = (app) => {
    const config = new DocumentBuilder()
        .setTitle('Vending Machine App')
        .setDescription('The Vending Machine API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);
}

export default createSwagger