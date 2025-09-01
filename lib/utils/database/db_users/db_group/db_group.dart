import 'dart:convert';
import 'dart:ffi';
import 'package:http/http.dart' as http;

class DbGroup {
  final String baseUrl = 'http://localhost:3000/group';

  Future<List<dynamic>> getGroup() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load groups');
    }
  }

  Future<dynamic> getGroupById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else if (response.statusCode == 404) {
      throw Exception('Group not found');
    } else {
      throw Exception('Failed to load group');
    }
  }

  Future<void> createGroup(String name, Float points) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{'name': name, 'points': points}),
    );

    if (response.statusCode != 201) {
      throw Exception('Falha ao criar o grupo');
    }
  }

  Future<void> updateGroup(int id, String name, Float points) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{'name': name, 'points': points}),
    );

    if (response.statusCode != 200) {
      throw Exception('Falha ao atualizar o grupo');
    }
  }

  Future<void> deleteGroup(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception('Falha ao deletar o grupo');
    }
  }
}
