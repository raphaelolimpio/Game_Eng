import 'dart:convert';
import 'package:http/http.dart' as http;

class DbQuests {
  final String baseUrl = 'http://localhost:3000/quests';

  Future<List<dynamic>> getQuests() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load quests');
    }
  }

  Future<dynamic> getQuestById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else if (response.statusCode == 404) {
      throw Exception('Quest not found');
    } else {
      throw Exception('Failed to load quest');
    }
  }

  Future<void> createQuest(
    String title,
    int idFunction,
    int level,
    String textQuest,
  ) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'title': title,
        'idFunction': idFunction,
        'level': level,
        'textQuest': textQuest,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to create quest');
    }
  }

  Future<void> updateQuest(
    int id,
    String title,
    int idFunction,
    int level,
    String textQuest,
  ) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'title': title,
        'idFunction': idFunction,
        'level': level,
        'textQuest': textQuest,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update quest');
    }
  }

  Future<void> deleteQuest(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception('Failed to delete quest');
    }
  }
}
