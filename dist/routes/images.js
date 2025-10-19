"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcessing_1 = require("../utils/imageProcessing");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (!filename)
        return res.status(400).send('Missing filename parameter.');
    if (!width || !height)
        return res.status(400).send('Missing width or height parameter.');
    if (width <= 0 || height <= 0)
        return res.status(400).send('Width and height must be positive numbers.');
    try {
        const imagePath = yield (0, imageProcessing_1.resizeImage)(filename, width, height);
        res.sendFile(imagePath);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
}));
exports.default = router;
//# sourceMappingURL=images.js.map