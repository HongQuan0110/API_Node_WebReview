import { productService } from "../services/index.service";

module.exports.createNewProduct = async (req, res, next) => {
    try {
        const product = {
            name: req.body.name,
            image: req.body.image,
            label: req.body.label,
            price: req.body.price,
        }

        const prodcutDetail = {
            screen: req.body.screen,
            mainCamera: req.body.mainCamera,
            selfieCamera: req.body.selfieCamera,
            platform: req.body.platform,
            memory: req.body.memory,
            comms: req.body.comms,
            body: req.body.body,
            battery: req.body.battery
        }

        await productService.createNewProduct(product, prodcutDetail);
        return res.status(201).send();
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const data = await productService.getProduct(productId);
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({error});
    }
}

module.exports.testUploadImage = (req, res, next) => {
    try {
        productService.testUploadImage(req, res);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
