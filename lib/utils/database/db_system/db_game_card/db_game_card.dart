import 'dart:convert';
import 'package:http/http.dart' as http;

class DbGameCard {
  final String baseUrl = 'http://localhost:3000/game_card';

  Future<List<dynamic>> getGameCards() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load game cards');
    }
  }

  Future<dynamic> getGameCardById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load game card');
    }
  }

  Future<void> createGameCard(
    String titleCard,
    String description,
    String? image,
  ) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'titleCard': titleCard,
        'description': description,
        'image': image,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to create game rule');
    }
  }

  Future<void> updateGameCard(
    int id,
    String titleCard,
    String description,
    String? image,
  ) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'titleCard': titleCard,
        'description': description,
        'image': image,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update game rule');
    }
  }

  Future<void> deleteGameCard(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception('Failed to delete game card');
    }
  }
}
