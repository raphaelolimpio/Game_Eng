import 'dart:convert';
import 'package:http/http.dart' as http;

class DbGameRules {
  final String baseUrl = 'http://localhost:3000/game_rules';

  Future<List<dynamic>> getGameRules() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load game rules');
    }
  }

  Future<dynamic> getGameRuleById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load game rule');
    }
  }

  Future<void> createGameRule(String titleRule, String description) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'titleRule': titleRule,
        'description': description,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to create game rule');
    }
  }

  Future<void> updateGameRule(
    int id,
    String titleRule,
    String description,
  ) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'titleRule': titleRule,
        'description': description,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update game rule');
    }
  }

  Future<void> deleteGameRule(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception('Failed to delete game rule');
    }
  }
}
