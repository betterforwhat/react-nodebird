const express = require('express');
const { Op } = require('sequelize');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
	try {
		const where = {};
		if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐때
			where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
		}

		req.query.lastId
		const posts = await Post.findAll({
			// where: { id: lastId },
			where,
			limit: 10, // 10개씩
			// offset: 100, // 101 ~ 110
			order: [
				['createdAt', 'DESC'],
				[Comment, 'createdAt', 'DESC'],
			], // 2차원 배열인 이유 include된 모델에대한 정렬
			include: [{
				model: User,
				attributes: ['id', 'nickname'],
			}, {
				model: Image,
			}, {
				model: Comment,
				include: [{
					model: User,
					attributes: ['id', 'nickname'],
				}]
			}, {
				model: User, // 좋아요 누른 사람
				as: 'Likers',
				attributes: ['id'],
			}, {
				model: Post,
				as: 'Retweet',
				include: [{
				  model: User,
				  attributes: ['id', 'nickname'],
				}, {
				  model: Image,
				}]
			  }]
		});

		res.status(200).json(posts);
		// 실무에서는 limit / offset 방식 사용 X
		// 살무는 limit과 lastId
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;